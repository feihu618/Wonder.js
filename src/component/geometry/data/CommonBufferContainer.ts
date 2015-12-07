/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class CommonBufferContainer extends BufferContainer{
        public static create(gameObject:GameObject) {
        	var obj = new this(gameObject);

        	return obj;
        }

        public geometryData:CommonGeometryData;

        @cache(function(type:BufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        protected getVertice(type:BufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            return ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);
        }

        @cache(function(type:BufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        protected getNormal(type:BufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            return ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);
        }
    }
}
