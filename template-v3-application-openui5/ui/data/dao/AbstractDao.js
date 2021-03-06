sap.ui.define([
	"cockpit2/data/Models",
	"cockpit2/utils/ViewUtils",
	"cockpit2/utils/ObjectUtils"
	
], function(Models, ViewUtils, ObjectUtils) {
	"use strict";

	function setId(entity) {
		if (ObjectUtils.isNull(entity.id) && ObjectUtils.isNotNull(entity.externalCode)) {
			entity.id = entity.externalCode;
		}
	}

	function getDao(view, modelName) {
		return {
				list: function() {
					var entities = Models.getData(view, modelName);
					return ObjectUtils.isNotNull(entities) ? entities : [];
				},
				get: function(id) {
					var entities = this.list(view, modelName);
					for (var i = 0; i < entities.length; i ++) {
						if (entities[i].id === id) {
							return entities[i];
						}
					}
					return null;
				},
				add: function(entity) {
					var entities = this.list(view, modelName);
					setId(entity);
					entities.push(entity);
					this.set(entities);
				},
				set: function (entities) {
					for (var i = 0; ObjectUtils.isNotNull(entities) && i < entities.length; i ++) {
						setId(entities[i]);
					}
					Models.setData(view, modelName, entities);
				},
				update: function (id, entity) {
					var entities = this.list(view, modelName);
					for (var i = 0; i < entities.length; i ++) {
						if (entities[i].id === id) {
							setId(entity);
							entities[i] = entity;
							break;
						}
					}
					this.set(entities);
				},
				remove: function(id) {
					var entities = this.list(view, modelName);
					for (var i = 0; i < entities.length; i ++) {
						if (entities[i].id === id) {
							entities.splice(i, 1);
							break;
						}
					}
					this.set(entities);
				},
				clearAll: function() {
					this.set([]);
				},
				contains: function(id) {
					return ObjectUtils.isNotNull(this.get(id));
				}
			};
	}

	return {
		getInstance: function(modelName) {
			return getDao(ViewUtils.getMainView(), modelName);
		}
	};
});