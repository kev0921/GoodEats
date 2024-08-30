echo "Deploying Backend..."
aws ecr get-login-password --region ca-central-1 | docker login --username AWS --password-stdin 058264290698.dkr.ecr.ca-central-1.amazonaws.com
docker build -t goodeats-backend .
docker tag goodeats-backend:latest 058264290698.dkr.ecr.ca-central-1.amazonaws.com/goodeats-backend:latest
docker push 058264290698.dkr.ecr.ca-central-1.amazonaws.com/goodeats-backend:latest
cd aws_deploy
eb deploy