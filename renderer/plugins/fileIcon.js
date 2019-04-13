import Vue from 'vue'
import WordIcon from '~/assets/images/word.png'
import ExcelIcon from '~/assets/images/excel.png'
import PowerpointIcon from '~/assets/images/powerpoint.png'
import PdfIcon from '~/assets/images/pdf.png'

Vue.prototype.$fileIcon = extname =>
  ({
    docx: WordIcon,
    xlsx: ExcelIcon,
    pptx: PowerpointIcon,
    pdf: PdfIcon,
  }[extname])
