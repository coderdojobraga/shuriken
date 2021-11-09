echo 'Nome do branch'
read branchName
git switch -c $branchName
cd _posts
mv template.txt $branchName.md