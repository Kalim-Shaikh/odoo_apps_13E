odoo.define('helpdesk_ticket_form_subject_validation.animation', function (require) {
'use strict';

    var core = require('web.core');
    var ajax = require('web.ajax');
    var publicWidget = require('web.public.widget');
    require('website_form.animation')
    
    var _t = core._t;
    var qweb = core.qweb;

    publicWidget.registry.form_builder_send.include({
        start: function (editable_mode) {
            var res = this._super.apply(this, arguments);
            this.helpdesk_template_loaded = ajax.loadXML('/helpdesk_ticket_form_subject_validation/static/src/xml/website_form.xml', qweb);
            return res
        },
        check_error_fields: function (error_fields) {
            var res = this._super.apply(this, arguments);
            var input_helpdesk_subject = $("input[data-input-helpdesk='helpdesk_input_subject']")
            if (res && input_helpdesk_subject.val().length > 200){

                var self = this;
                input_helpdesk_subject.addClass('o_has_error').addClass('is-invalid')
                this.$target.find('.o_website_form_send').on('click',function (e) {self.send(e);}).removeClass('disabled');
                var $result = this.$('#o_website_form_result');
                this.helpdesk_template_loaded.then(function () {
                    $result.replaceWith(qweb.render("helpdesk_ticket_form_subject_validation.status_helpdesk_subject_length"));
                });
                return false
            }
            return res
        },
    })
    
});
