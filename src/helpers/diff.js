import { Component } from '@angular/core';
import $ from 'jquery';

var computeDiff = function(pre, post, idIndex){

    var toMap = function(arr){
        var result = {};
        arr.forEach(function(i){
            result[i[idIndex]] = i;
        })
        return result;
    }
    var preMap = toMap(pre);
    var postMap = toMap(post);
    var preKeys = Object.keys(preMap);
    var postKeys = Object.keys(postMap);

    var diff = {
        deleted: preKeys.filter(k => postKeys.indexOf(k) < 0).map(k => preMap[k]),
        added: postKeys.filter(k => preKeys.indexOf(k) < 0).map(k => postMap[k]),
        modified: [],
    }
    
    for(var i = 0; i < preKeys.length; i++)
    {
        var id = preKeys[i];
        var preItem = preMap[id];
        var postItem = postMap[id];
        if(!postItem)
            continue;
        for(var j = 0; j < preItem.length; j++){
            if(preItem[j] !== postItem[j]){
                diff.modified.push(postItem);
                break;
            }
        }
    }
    
    diff.total = diff.deleted.length + diff.added.length + diff.modified.length;
    
    return diff;
}

var diffProps = {
    initDiffComponent: function(){
        var ctrl = this;
        window.addEventListener('beforeunload', onbeforeunload);
        function onbeforeunload(e) {
            if(ctrl.isForceQuit){
                return;
            }
                
            ctrl.afterSaveAction = ctrl.closeTarget == 'home' ? 'home' : 'quit';
            ctrl.closeTarget = null;
            
            ctrl.diff = computeDiff(ctrl.initialData, ctrl.hot.getSourceData(), 0);
            if(ctrl.diff.total > 0){
                e.returnValue = "not closing";
                $("#modal-save-diff").modal("show");
            }
        };
    },
    openSaveDiffDialog: function(){
        this.diff = computeDiff(this.initialData, this.hot.getSourceData(), 0);
        if(this.diff.total > 0){
            this.afterSaveAction = null;
            $("#modal-save-diff").modal("show");
        }
    },
    forceQuit: function(){
        this.isForceQuit = true;
        this.afterSave();
    },

    afterSave: function(){
        if(this.afterSaveAction == "home"){
            document.location.href="app.html";
        } else if(this.afterSaveAction == "quit"){
            app.quit();
        }
    },

};

export default diffProps;