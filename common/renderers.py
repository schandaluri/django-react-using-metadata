from collections import OrderedDict

from rest_framework.renderers import JSONRenderer
from rest_framework import status


class BaseJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        request = renderer_context['request']
        response = renderer_context['response']
        _data = OrderedDict()
        # _data['path'] = request.path
        if status.is_success(response.status_code):
            _data['data'] = data
        else:
            data['status_code'] = response.status_code
            _data['errors'] = data
        _data['meta'] = OrderedDict([
            # ('api_version', '0.0.1'),
            ('application', OrderedDict([('name', 'my_apis'), ('version', '0.0.1')])),
        ])
        context = super(BaseJSONRenderer, self).render(_data, accepted_media_type, renderer_context)
        return context
