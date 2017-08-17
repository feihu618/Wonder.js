import { DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { render as frontRender } from "../../../utils/worker/render_file/render/light/front/frontRenderUtils";
import { bindIndexBuffer, use } from "../../../../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../../texture/MapManagerSystem";
import {
    cleanColorDirty as cleanAmbientLightColorDirty,
    getColorArr3 as getAmbientLightColorArr3,
    isColorDirty as isAmbientLightColorDirty
} from "../../../../../component/light/AmbientLightSystem";
import {
    cleanColorDirty as cleanDirectionLightColorDirty, cleanIntensityDirty as cleanDirectionLightIntensityDirty,
    cleanPositionDirty as cleanDirectionLightPositionDirty,
    getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
    getPosition as getDirectionLightPosition, isColorDirty as isDirectionLightColorDirty, isIntensityDirty as isDirectionLightIntensityDirty, isPositionDirty as isDirectionLightPositionDirty,
} from "../../../../../component/light/DirectionLightSystem";
import {
    getPosition as getPointLightPosition,
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange, isPositionDirty as isPointLightPositionDirty, isColorDirty as isPointLightColorDirty,
    isIntensityDirty as isPointLightIntensityDirty, isAttenuationDirty as isPointLightAttenuationDirty, cleanPositionDirty as cleanPointLightPositionDirty, cleanColorDirty as cleanPointLightColorDirty, cleanIntensityDirty as cleanPointLightIntensityDirty,
    cleanAttenuationDirty as cleanPointLightAttenuationDirty
} from "../../../../../component/light/PointLightSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../shader/glslSender/GLSLSenderSystem";
import { useShader } from "../../../../../component/material/MaterialSystem";
import { buildDrawFuncDataMap } from "../../../utils/worker/render_file/draw/drawRenderCommandBufferUtils";
import { LightRenderCommandBufferForDrawData } from "../../../../type/dataType";
import { directlySendUniformData } from "../../../../utils/worker/render_file/render/renderUtils";
import { sendUniformData } from "../LightRenderSystem";
import { sendAttributeData } from "../../RenderSystem";
import { CameraRenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";

export var render = curry((gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, bufferData: LightRenderCommandBufferForDrawData, cameraData:CameraRenderCommandBufferForDrawData) => {
    frontRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, _buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        getAmbientLightColorArr3, isAmbientLightColorDirty, cleanAmbientLightColorDirty,

        getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty,

        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, isPointLightPositionDirty, isPointLightColorDirty, isPointLightIntensityDirty, isPointLightAttenuationDirty, cleanPointLightPositionDirty, cleanPointLightColorDirty, cleanPointLightIntensityDirty, cleanPointLightAttenuationDirty,
        drawDataMap, ThreeDTransformData, GameObjectData
    ), initShaderDataMap, bufferData, cameraData);
})

var _buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    getAmbientLightColorArr3, isAmbientLightColorDirty,   cleanAmbientLightColorDirty,
    getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty,  cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty,
    getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, isPointLightPositionDirty, isPointLightColorDirty, isPointLightIntensityDirty, isPointLightAttenuationDirty, cleanPointLightPositionDirty, cleanPointLightColorDirty, cleanPointLightIntensityDirty, cleanPointLightAttenuationDirty,

    drawDataMap: DrawDataMap, ThreeDTransformData: any, GameObjectData: any) => {
    return {
        glslSenderData: {
            sendMatrix3: sendMatrix3,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendInt: sendInt,
            sendFloat1: sendFloat1,
            sendFloat3: sendFloat3,

            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        },
        ambientLightData: {
            getColorArr3: getAmbientLightColorArr3,

            isColorDirty : isAmbientLightColorDirty,
            cleanColorDirty: cleanAmbientLightColorDirty,

            AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData: {
            getPosition: (index: number, DirectionLightDataFromSystem:any) => {
                return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, DirectionLightDataFromSystem).values;
            },
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,

            isPositionDirty: isDirectionLightPositionDirty,
            isColorDirty : isDirectionLightColorDirty,
            isIntensityDirty : isDirectionLightIntensityDirty,
            cleanPositionDirty: cleanDirectionLightPositionDirty,
            cleanColorDirty: cleanDirectionLightColorDirty,
            cleanIntensityDirty: cleanDirectionLightIntensityDirty,

            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            getPosition: (index: number, PointLightDataFromSystem:any) => {
                return getPointLightPosition(index, ThreeDTransformData, GameObjectData, PointLightDataFromSystem).values;
            },
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getConstant,
            getLinear: getLinear,
            getQuadratic: getQuadratic,
            getRange: getRange,

            isPositionDirty: isPointLightPositionDirty,
            isColorDirty : isPointLightColorDirty,
            isIntensityDirty : isPointLightIntensityDirty,
            isAttenuationDirty : isPointLightAttenuationDirty,
            cleanPositionDirty: cleanPointLightPositionDirty,
            cleanColorDirty: cleanPointLightColorDirty,
            cleanIntensityDirty: cleanPointLightIntensityDirty,
            cleanAttenuationDirty: cleanPointLightAttenuationDirty,



            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    }
}

