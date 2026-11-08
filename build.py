#!/usr/bin/env python3
"""Baut styles.min.css aus styles.css. Aufruf: python3 build.py"""
import rcssmin, pathlib, time
src = pathlib.Path(__file__).with_name("styles.css").read_text(encoding="utf-8")
out = "/* Energieberater Ramirez — generiert aus styles.css (%s). Nicht von Hand editieren. */\n" % time.strftime("%Y-%m-%d") + rcssmin.cssmin(src)
pathlib.Path(__file__).with_name("styles.min.css").write_text(out, encoding="utf-8")
print("styles.min.css:", len(out.encode()), "bytes")
