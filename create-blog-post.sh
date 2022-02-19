echo 'Nome do branch'
read branchName
git switch -c $branchName
cd _posts
cp template.txt $branchName.md