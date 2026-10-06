#!/usr/bin/env python3
"""ingest.py <slot> <blob-or-file> : copy raw to masters and key into packages/kit-demo-art/static/demo/symbols/<slot>.webp"""
import sys, shutil, subprocess, os, glob
slot, src = sys.argv[1], sys.argv[2]
B = 'C:/Users/Admin/.claude/projects/C--source/3fcbacba-e337-42f0-b8ca-2c545a474eef/tool-results/mcp-artlist-blob-'
src = src.replace('/c/', 'C:/', 1) if src.startswith('/c/') else src
if not os.path.exists(src): src = B + src + '.jpg'
M = 'C:/source/shared/demo-art-library/masters/symbols/'
S = 'C:/source/_studio-kit/web-sdk/packages/kit-demo-art/static/demo/symbols/'
ext = os.path.splitext(src)[1]
raw = M + slot + '_raw' + ext
if os.path.abspath(src) != os.path.abspath(raw): shutil.copy(src, raw)
K = 'C:/source/_studio-kit/web-sdk/tools/demo-art/key_still.py'
args = ['python', K, raw, S + slot + '.webp', '--size', '512']
if slot in ('C1','C2','C3','C4','COL1','COL2','MW1','MW2','MW3','DW','X','M','S','S2'): args += ['--shadow']
if slot in ('T1', 'T2', 'T3'): args += ['--nokey', '--pad', '0']
subprocess.run(args, check=True)
