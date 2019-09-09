#!/bin/sh

# This probably only runs on a mac. You will need the cli software sips and pngquant. The former seems
# to come with most macs and the later can be brew installed.

# Step 1 is to get the newest s3 bucket
# aws s3 sync s3://cards.mythgardhub.com somedir. copy this script into somedir. TODO make this part of the script?

# Step 2 run script

# Step 3 remove script and sync to s3
# aws s3 sync . s3://cards.mythgardhub.com --acl public-read
# You may want these extra args: --exclude "core/*.png" --include "core/m/*"
# You probably aren't touching the originals so this is likely a decent idea as it will
# save time and bandwidth, and prevent accidentally doing something bad to a full-size.
# Repeat for /core/s dir as well.

# We start with full sized images. These are full fidelity but not web-friendly at all,
# each is like 1MB.

# First copy the full sized images to the "m" (medium) folder. Medium is currently the largest
# size we will use on the web.
cp core/*.png core/m

# Next, shrink the medium images and compress them.
for file in core/m/*.png
do
  # make 333px wide
  sips --resampleWidth 333 "$file";
  # lossily shrink image by removing unnecessary colors (quantize)
  pngquant 256 "$file" --output "$file" -f;
done

# now make small versions, used for big lists of cards
cp core/m/*.png core/s/
for file in core/s/*.png
do
  # make 333px wide
  sips --resampleWidth 160 "$file";
  # lossily shrink image by removing unnecessary colors (quantize)
  pngquant 256 "$file" --output "$file" -f;
done

# OPTIONAL - and requires imageoptim.
# remove metadata and other cruft. This is super slow (e.g. 1 hour), and only saves 5-10% more space, so
# if pressed for time you can probably skip it. In fact, I'll leave it commented out for now.
# imageoptim core/m/*.png;
# imageoptim core/s/*.png;
