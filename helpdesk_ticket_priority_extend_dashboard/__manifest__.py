# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name' : 'Helpdesk Ticket Priority Extend Dashboard',
    'version' : '1.0',
    'summary': 'Helpdesk Ticket Priority Extend Dashboard',
    'sequence': 15,
    'description': """
Helpdesk Ticket Priority Extend Dashboard
Helpdesk Ticket Priority Extend Dashboard
====================
.
    """,
    'price': 20,
    'category': 'Operations/Helpdesk',
    'images' : [],
    'depends' : [
        'helpdesk',
    ],
    'data': [
        'views/helpdesk_ticket_view.xml',
        'views/helpdesk_template.xml',
    ],
    'qweb': [
        "static/src/xml/helpdesk_team_templates.xml",
    ],
    'installable': True,
    'application': True,
}
