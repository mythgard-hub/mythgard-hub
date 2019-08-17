#!/bin/sh
#
# This script is for loading the cards csv into postgres in
# development (example rows may be enough for normal development).

# Since Docker loads some fake cards for you, you may never need this.

# This file also serves as an example of how one could import cards
# to the production or staging environments.
psql -h localhost -p 5433 -U postgres -d postgres -f import-cards.sql
