import json
import logging
import traceback
from datetime import datetime


def format_timestamp(timestamp: float):
    dt = datetime.utcfromtimestamp(timestamp)
    return dt.strftime("%Y-%m-%dT%H:%M:%S") + ".%03d" % (dt.microsecond / 1000) + "Z"


class ConsoleFormatter:
    def __init__(self, log_type="LOG", **extra):
        self._log_type = log_type
        self._extra = extra

    def format(self, record: logging.LogRecord):
        message = {
            # Mandatory values for Qvantel logstash format
            "@timestamp": format_timestamp(record.created),
            "log_type": self._log_type,
            "@version": "1",
            "log_level": record.levelname,
            "logger_name": record.name,
            "message": record.getMessage(),
            "level_value": record.levelno,
            # Optional values that are available readily
            "thread_name": record.threadName,
        }

        if self._extra:
            message.update(self._extra)  # TODO: Serialize

        if record.exc_info:
            if isinstance(record.exc_info, tuple):
                message["stack_trace"] = "".join(
                    traceback.format_exception(*record.exc_info)
                )
            else:
                message["stack_trace"] = "".join(traceback.format_stack())

        return json.dumps(message)


class ConsoleHandler(logging.StreamHandler):
    def __init__(self, stream=None, **kwargs):
        super().__init__(stream=stream)
        self.setFormatter(ConsoleFormatter(**kwargs))
