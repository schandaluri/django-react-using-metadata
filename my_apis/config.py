import os
import glob
import json
from functools import partial
from collections import defaultdict

import yaml
try:
    from yaml import CLoader as Loader
except ImportError:
    from yaml import Loader


class ConfigUtil:
    FILE_READERS = {
        ".yaml": partial(yaml.load, Loader=Loader),
        ".yml": partial(yaml.load, Loader=Loader),
        ".json": json.loads,
    }

    def __init__(self, config_dir=None):
        self.config_dir = os.getenv('CONFIG_DIR_PATH', config_dir or 'config')

    def get_config_by_path(self, key):
        settings = defaultdict(dict)
        key_var = key.split("/")[-1]
        for cfg_file in glob.glob(f"{self.config_dir}/{key_var}.*"):
            settings[key_var].update(self._read_file(cfg_file))
        return settings.get(key_var)

    def _read_file(self, filename):
        file_ext = os.path.splitext(filename)[-1]
        reader = self.FILE_READERS.get(file_ext)
        with open(filename) as fp:
            return reader(fp.read())
