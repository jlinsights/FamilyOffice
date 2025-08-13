#!/bin/bash

# Script to delete files with excessively long names in the FamilyOffice project

echo "Searching for files with long names in partner-data directory..."

# Navigate to the project directory
cd /Users/jaehong/Developer/Projects/FamilyOffice

# Delete the specific problematic file - use find to locate and delete
echo "Deleting the problematic HWP file..."
find "public/partner-data/learn-investment/documents/증여 상속/1. 증여세 신고서식/" -name "*증여세과세표준신고*" -type f -delete

# Search for other files with long names (filename > 100 characters) and delete them automatically
echo "Searching for and deleting other files with long names..."
find public/partner-data -type f | while read -r file; do
    filename=$(basename "$file")
    if [ ${#filename} -gt 100 ]; then
        echo "Found and deleting file with long name (${#filename} chars): $file"
        rm -f "$file"
        echo "Deleted: $file"
    fi
done

echo "Long file cleanup complete."