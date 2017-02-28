import csv

csvfile = open("wind/currentWindLocs.csv")
newcsvfile = open("wind/newWindLocs.csv", "w+")
spamreader = csv.reader(csvfile)
spamwriter = csv.writer(newcsvfile)
for row in spamreader:
    row.append(row[3][0:8])
    row.append(row[3][10:18])
    spamwriter.writerow(row)
