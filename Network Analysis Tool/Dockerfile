# Use an official Python runtime as the base image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir scapy matplotlib pandas scikit-learn imblearn seaborn

# Run the network analysis script when the container launches
CMD ["python", "network_analysis.py"]
