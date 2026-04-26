#!/bin/bash
y=$(ls | grep "package.js")

c=$(cat "$y")

echo "$c"