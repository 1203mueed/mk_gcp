# python_service/Dockerfile
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies for OpenCV and git
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglx-mesa0 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application files
COPY . .

EXPOSE 8080
ENV PORT=8080
ENV ULTRALYTICS_OFFLINE=1
CMD ["python", "app.py"]