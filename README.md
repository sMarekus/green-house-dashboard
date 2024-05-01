# Green House Dashboard

This project is a React TypeScript application configured to run inside a Docker container. It includes hot reloading for development ease.

## Prerequisites

Before you begin, ensure you have Docker installed on your machine. You can download and install Docker from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Getting Started

Follow these instructions to get your development environment up and running.

### Building the Docker Image

To build the Docker image, run the following command from the root directory of the project:

```bash
docker build -t green-house-dev .
```
This command builds a Docker image named green-house-dev based on the contents of the current directory and the instructions from the Dockerfile.

### Running the Docker Container
To start the application with hot reloading enabled, execute the following command:

```bash
docker run -i -v ${PWD}:/usr/src/app:delegated -v /usr/src/app/node_modules/ -p 3000:3000 green-house-dev
```

## Accessing the Application
Once the container is running, open your web browser and navigate to http://localhost:3000 to view the application.
