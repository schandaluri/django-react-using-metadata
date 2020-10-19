from rest_framework.metadata import SimpleMetadata


class CustomMetadata(SimpleMetadata):
    """
    Don't include field and other information for `OPTIONS` requests.
    Just return the name and description.
    """
    def determine_actions(self, request, view):
        data = {}
        actions = ['create', 'update']
        for action in actions:
            serializer = view.get_metadata_serializer(action)
            data[action] = self.get_serializer_info(serializer)
        return data
