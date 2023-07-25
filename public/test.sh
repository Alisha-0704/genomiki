#!/bin/bash
#--------------------------------------------Configuration-------------------------------------------------------------------------------

inputDir="/c/Users/alish/Downloads/genomiki"
dir_qc="/c/Users/alish/Downloads/genomiki/fastqc"


# ------------------------------------------------------------------------------------------------------------------Configuraiton END------
for f in ls "$inputDir"/*.fastq.gz
do 
if [ $echo $f != 'ls' ]
then
S=$(basename $f)
variable=$(echo $S | awk -F"_R" '{print $1;}')

#args+=("variable")
var1=$var1' '$variable
fi
done
unqpre=$(echo "$var1" | xargs -n1 | sort -u | xargs)
echo $unqpre
echo "total number of Libraries are " ; echo "$unqpre" | wc -w;

for f in $unqpre
do




[ -d $dir_qc ] || mkdir -p $dir_qc

	filep1=$inputDir/"$f"_R1.fastq.gz
	filep2=$inputDir/"$f"_R2.fastq.gz
	
fastqc $filep1 $filep2 -o $dir_qc



# The multi-QC will be at the end of analysis.................to avaid the repeatition--------------------------------------------------


echo $f
done
test.sh
Displaying test.sh.