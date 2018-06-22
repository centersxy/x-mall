import {Message,Modal,Icon,Button,Form,Input,FormItem,Checkbox} from 'iview'
const iview = {
  install: function (Vue) {
    Vue.prototype.$Message = Message
    Vue.component('Modal', Modal)
    Vue.component('Icon', Icon)
    Vue.component('IButton', Button)
    Vue.component('Form', Form)
    Vue.component('Input', Input)
    Vue.component('FormItem', FormItem)
    Vue.component('Checkbox', Checkbox)
  }
}

export default iview
