<!--https://docs.ckeditor.com/ckeditor5/latest/builds/guides/integration/installation.html-->
<template>
  <div><input type="text"/></div>
</template>
<script>
//npm install --save @ckeditor/ckeditor5-build-classic
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: {
        // 只检测类型
        value: String,
        readOnly: {
            type: Boolean,
            default: false
        },
        isHtmlEncode: {
            type: Boolean,
            default: true
        },
        bodyClass: {
            type: String,
            default: ''
        },
        contentsCss: {
            type: [String, Array],
            default: ''
        },
        extraPlugins: {
            type: String,
            default: ''
        },
        height: {
            type: [String, Number],
            default: 200
        },
        width: {
            type: [String, Number],
            default: ''
        }
    },
    data () {
        return {
            ckeditor: null,
            timer: null,
            updateDelay: 300
        };
    },
    methods: {
        applyCkeditor () {
            var me = this;
            //https://docs.ckeditor.com/ckeditor5/latest/api/module_editor-classic_classiceditor-ClassicEditor.html
            ClassicEditor.create(me.$el.querySelector("input"), {
                bodyClass: me.bodyClass,
                contentsCss: me.contentsCss,
                extraPlugins: me.extraPlugins,
                readOnly: me.readOnly,
                width: me.width,
                height: me.height
            }).then( editor => {
                 me.ckeditor = editor;
                 me.setValue(me.value);
                 //https://stackoverflow.com/questions/45133183/listen-to-event-fired-when-the-content-has-changed-in-ckeditor-5
                 me.ckeditor.model.document.on("change",( ) =>{
                     me.onUpdateValue();
                 });
            })
            .catch( err => {
                console.error( err.stack );
            } );

        },
        onUpdateValue () {
            var me = this;
            if (me.isHtmlEncode) {
                me.$emit("input", me.htmlEncode(me.ckeditor.getData()));
            }
            else {
                me.$emit("input", me.ckeditor.getData());
            }
        },
        setValue (value) {
            var me = this;
            var ck=me.ckeditor;
            if (me.isHtmlEncode) {
                ck.setData(this.htmlDecode(value));
            }
            else {
                ck.setData(value);
            }
        },
        getValue () {
            var me = this;
            if (me.isHtmlEncode) {
                return me.htmlDecode(me.ckeditor.getData());
            }
            return me.ckeditor.getData();
        },
        getRawValue () {
            var me = this,
                value = me.ckeditor.getData();

            if (me.isHtmlEncode) {
                return me.htmlEncode(value);
            }

            return value;
        },
        htmlEncode (value) {
            return (value + "").replace(/&/g, "&amp;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        },
        htmlDecode (value) {
            return (value + "").replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">");
        }
    },
    watch: {
        value (val, oldVal) {
            var me = this;
            if (me.getRawValue() !== val) {
                me.setValue(val);
            }
        }
    },
    mounted () {
        var me = this;        
        me.applyCkeditor();
    }
}
</script>
