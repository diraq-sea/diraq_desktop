import Vue from 'vue'
import WordIcon from '~/assets/imgs/word.png'
import ExcelIcon from '~/assets/imgs/excel.png'
import PowerpointIcon from '~/assets/imgs/powerpoint.png'

Vue.prototype.$fileIcon = extname =>
  ({
    docx: WordIcon,
    xls: ExcelIcon,
    pptx: PowerpointIcon,
  }[extname])
