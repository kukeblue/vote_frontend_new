import React from 'react'
import './index.less'
import { getImageByCode } from '../../utils/format'
import useSettingStore from '../../store/settingStore'

export default function Flotage() {
    const activitySetting = useSettingStore((state) => state.activitySetting)
    const pageFloat = activitySetting.page_float.values

    return  pageFloat && <div className="flotage">
        <img  src={getImageByCode(pageFloat)} id="snow1" class="glyphicon float-bg"/>
        <img  src={getImageByCode(pageFloat)} id="snow3" class="glyphicon float-bg"/>
        <img  src={getImageByCode(pageFloat)} id="snow4" class="glyphicon float-bg"/>
        <img  src={getImageByCode(pageFloat)} id="snow5" class="glyphicon float-bg"/>
        <img  src={getImageByCode(pageFloat)} id="snow6" class="glyphicon float-bg"/>
        <img  src={getImageByCode(pageFloat)} id="snow7" class="glyphicon float-bg"/>
        <img  src={getImageByCode(pageFloat)} id="snow9" class="glyphicon float-bg"/>
        <img  src={getImageByCode(pageFloat)} id="snow11" class="glyphicon float-bg"/>
        <img  src={getImageByCode(pageFloat)} id="snow12" class="glyphicon float-bg"/>
    </div>
}
  
  


