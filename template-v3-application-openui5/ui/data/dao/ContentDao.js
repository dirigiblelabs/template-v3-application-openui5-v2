sap.ui.define([
	"cockpit2/data/dao/AbstractDao",
	"cockpit2/utils/ViewUtils"
	
], function(AbstractDao, ViewUtils) {
	"use strict";

	var dao = null;

	return {
		getInstance: function() {
			if (!dao) {
				dao = AbstractDao.getInstance("Content");
			}
			return {
				list: function() {
					return dao.list();
				},
				get: function(id) {
					return dao.get(id);
				},
				add: function(entity) {
					dao.add(entity);
				},
				set: function (entities) {
					dao.set(entities);
				},
				update: function(id, entity) {
					dao.update(id, entity);
				},
				remove: function(id) {
					dao.remove(id);
				},
				clearAll: function() {
					dao.clearAll();
				},
				contains: function(id) {
					return dao.contains(id);
				}
			};
		}
	};
});