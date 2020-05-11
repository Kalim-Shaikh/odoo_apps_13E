# -*- coding: utf-8 -*-

from odoo import models, fields, api
from odoo.osv import expression


class HelpdeskTicket(models.Model):
    _inherit = 'helpdesk.ticket'

    priority = fields.Selection(
        selection_add=[('4', 'Critical')],
    )


class HelpdeskTeam(models.Model):
    _inherit = "helpdesk.team"
    
    @api.model
    def retrieve_dashboard(self):
        domain = [('user_id', '=', self.env.uid)]
        res = super(HelpdeskTeam, self).retrieve_dashboard()
        HelpdeskTicket = self.env['helpdesk.ticket']
        tickets = HelpdeskTicket.search_read(expression.AND([domain, [('stage_id.is_close', '=', False)]]), ['sla_deadline', 'close_hours', 'sla_reached_late', 'priority'])
        result = {
            'my_critical': {'count': 0, 'hours': 0, 'failed': 0},
        }

        def _is_sla_failed(data):
            deadline = data.get('sla_deadline')
            sla_deadline = fields.Datetime.now() > deadline if deadline else False
            return sla_deadline or data.get('sla_reached_late')

        def add_to(ticket, key="my_critical"):
            result[key]['count'] += 1
            result[key]['hours'] += ticket['close_hours']
            if _is_sla_failed(ticket):
                result[key]['failed'] += 1

        for ticket in tickets:
            if ticket['priority'] == '4':
                add_to(ticket, 'my_critical')
        result['my_critical']['hours'] = round(result['my_critical']['hours'] / (result['my_critical']['count'] or 1), 2)
        res.update(result)

        return res
