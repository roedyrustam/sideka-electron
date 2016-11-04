import request from 'request';
import path from 'path';
import { remote } from 'electron'; 
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from '../env';
import os from 'os';

var SERVER = "https://api.sideka.id";
if(env.name !== "production")
    SERVER = "http://10.10.10.107:5000";
var app = remote.app;
var DATA_DIR = app.getPath("userData");
var CONTENT_DIR = path.join(DATA_DIR, "contents");
jetpack.dir(CONTENT_DIR);

var dataapi = {
    
    auth: null,

    getActiveAuth: function () {
        var authFile = path.join(DATA_DIR, "auth.json");
        if(!jetpack.exists(authFile))
            return null;
        return JSON.parse(jetpack.read(authFile));
    },

    saveActiveAuth: function(auth) {
        var authFile = path.join(DATA_DIR, "auth.json");
        if(auth)
            jetpack.write(authFile, JSON.stringify(auth));
        else
            jetpack.remove(authFile);
    },

    login: function(user, password, callback){
        var info = os.type()+" "+os.platform()+" "+os.release()+" "+os.arch()+" "+os.hostname()+" "+os.totalmem();
        request({
            url: SERVER+"/login",
            method: "POST",
            json: {"user": user, "password": password, "info": info},
        }, callback);
    },

    logout: function(){
        var auth = this.getActiveAuth();
        this.saveActiveAuth(null);
        request({
            url: SERVER+"/logout",
            method: "GET",
            headers: {
                "X-Auth-Token": auth.token.trim()
            }
        }, function(){});
    },
    
    checkAuth: function(callback){
        var auth = this.getActiveAuth();
        request({
            url: SERVER+"/check_auth/"+auth.desa_id,
            method: "GET",
            headers: {
                "X-Auth-Token": auth.token.trim()
            }
        }, callback);
    },

    getDesa: function(callback){
        var fileName = path.join(DATA_DIR, "desa.json");
        var fileContent = [];

        if(jetpack.exists(fileName)){
            fileContent =  JSON.parse(jetpack.read(fileName));
        }
        var url = SERVER+"/desa";
        request({
            url: url,
            method: "GET",
        }, function(err, response, body){
            if(!response || response.statusCode != 200) {
                callback(fileContent);
            } else {
                jetpack.write(fileName, body);
                callback(JSON.parse(body));
            }
        });
    },
    
    getContentSubTypes: function(type, callback){
        var fileName = path.join(CONTENT_DIR, type+"_subtypes.json");
        var fileContent = [];
        var auth = this.getActiveAuth();

        if(jetpack.exists(fileName)){
            fileContent =  JSON.parse(jetpack.read(fileName));
        }
        request({
            url: SERVER+"/content/"+auth.desa_id+"/"+type+"/subtypes",
            method: "GET",
            headers: {
                "X-Auth-Token": auth.token.trim()
            }
        }, function(err, response, body){
            if(!response || response.statusCode != 200) {
                callback(fileContent);
            } else {
                jetpack.write(fileName, body);
                callback(JSON.parse(body));
            }
        });
    },
    
    getContent: function(type, subType, defaultValue, callback){
        var fileName = path.join(CONTENT_DIR, type+".json");
        if(subType)
            fileName = path.join(CONTENT_DIR, type+"_"+subType+".json");
        var fileContent = defaultValue;
        var timestamp = 0;
        var auth = this.getActiveAuth();

        if(jetpack.exists(fileName)){
            fileContent =  JSON.parse(jetpack.read(fileName));
            timestamp = fileContent.timestamp;
        }
        var url = SERVER+"/content/"+auth.desa_id+"/"+type+"?timestamp="+timestamp;
        if(subType)
            url = SERVER+"/content/"+auth.desa_id+"/"+type+"/"+subType+"?timestamp="+timestamp;
        request({
            url: url,
            method: "GET",
            headers: {
                "X-Auth-Token": auth.token.trim()
            }
        }, function(err, response, body){
            if(!response || response.statusCode != 200) {
                callback(fileContent);
            } else {
                jetpack.write(fileName, body);
                callback(JSON.parse(body));
            }
        });
    },
    
    saveContent: function(type, subType, content, callback){
        var fileName = path.join(CONTENT_DIR, type+".json");
        if(subType)
            fileName = path.join(CONTENT_DIR, type+"_"+subType+".json");
        
        var auth = this.getActiveAuth();
        var url= SERVER+"/content/"+auth.desa_id+"/"+type;
        if(subType)
            url= SERVER+"/content/"+auth.desa_id+"/"+type+"/"+subType;
        request({
            url: url,
            method: "POST",
            headers: {
                "X-Auth-Token": auth.token.trim()
            },
            json: content
        }, function(err, response, body){
            if(!err)
                jetpack.write(fileName, JSON.stringify(content));            
            if(!response || response.statusCode != 200) {
               //todo, save later
            } 
            if(callback)
                callback(err, response, body);
        });
    }
    
    
}
export default dataapi;