odoo.define('helpdesk_ticket_priority_extend_dashboard.animation', function (require) {
'use strict';

    var core = require('web.core');
    var ajax = require('web.ajax');
    var publicWidget = require('web.public.widget');
    require('website_form.animation')
    
    var _t = core._t;
    var qweb = core.qweb;

    publicWidget.registry.form_builder_send.include({
        events: {
            'change .o_hepldesk_file_upload': '_OnChangeHelpdeskFile',
        },
        start: function (editable_mode) {
            var res = this._super.apply(this, arguments);
            this.helpdesk_size_limit_template = ajax.loadXML('/helpdesk_ticket_priority_extend_dashboard/static/src/xml/website_form.xml', qweb);
            return res
        },
        _OnChangeHelpdeskFile: function(el){
            for (var i=0; i < $(el.currentTarget)[0].files.length; i++){
                if ($(el.currentTarget)[0].files[i].size > 100000000){
                    $(el.currentTarget).val("")
                    var $result = this.$('#o_website_form_result');
                    this.helpdesk_size_limit_template.then(function () {
                        $result.replaceWith(qweb.render("helpdesk_ticket_priority_extend_dashboard.file_size_limitation"));
                    });
                }
            }
        },
    })
    
});
