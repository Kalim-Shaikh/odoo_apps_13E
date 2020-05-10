# -*- coding: utf-8 -*-

from odoo import models


class HelpdeskTicket(models.Model):
    _inherit = 'helpdesk.ticket'

    def write(self, vals):
        for rec in self:
            if vals.get('stage_id'):
                stage_id = self.env['helpdesk.stage'].browse(vals.get('stage_id'))
                body = '<p> Stage Changed </p>'
                body += '<ul> <li><span> Stage: </span> <span> '+ rec.stage_id.name +' </span> <span class="fa fa-long-arrow-right" title="Changed"></span> <span> '+ stage_id.name +' </span> </li></ul>'
                rec.message_post(body=body, subtype_id=self.env.ref('mail.mt_comment').id, message_type='comment')
        return super(HelpdeskTicket, self).write(vals)
