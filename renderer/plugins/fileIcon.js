import Vue from 'vue'
import WordIcon from '~/assets/imgs/word.png'
import ExcelIcon from '~/assets/imgs/excel.png'
import PowerpointIcon from '~/assets/imgs/powerpoint.png'
import PdfIcon from '~/assets/imgs/pdf.png'

Vue.prototype.$fileIcon = extname =>
  ({
    docx: WordIcon,
    xlsx: ExcelIcon,
    pptx: PowerpointIcon,
    pdf: PdfIcon,
  }[extname])
