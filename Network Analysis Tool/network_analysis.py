import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scapy.all import sniff
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE

# Callback function to process captured packets
def packet_callback(packet):
    packet_info = {}
    
    if packet.haslayer('IPv6'):
        packet_info['source_ip'] = packet['IPv6'].src
        packet_info['destination_ip'] = packet['IPv6'].dst
        packet_info['protocol'] = 'IPv6'
    elif packet.haslayer('IP'):
        packet_info['source_ip'] = packet['IP'].src
        packet_info['destination_ip'] = packet['IP'].dst
        packet_info['protocol'] = 'IPv4'
    
    if packet.haslayer('TCP'):
        packet_info['source_port'] = packet['TCP'].sport
        packet_info['destination_port'] = packet['TCP'].dport
        packet_info['protocol'] = 'TCP'
    elif packet.haslayer('UDP'):
        packet_info['source_port'] = packet['UDP'].sport
        packet_info['destination_port'] = packet['UDP'].dport
        packet_info['protocol'] = 'UDP'

    packet_info['packet_size'] = len(packet)
    packet_info['timestamp'] = packet.time
    
    return packet_info

# Preprocess captured packets and store in a list
print("Preprocessing...")
preprocessed_packets = []

# Callback function to store preprocessed packets
def store_packet(packet):
    packet_info = packet_callback(packet)
    preprocessed_packets.append(packet_info)

# Capture packets on the network interface
print("Sniffing...")
sniff(prn=store_packet, count=10)  # Capture 10 packets and call store_packet for each

# Convert preprocessed packets to pandas DataFrame
df = pd.DataFrame(preprocessed_packets)

# Print df and check
print("DataFrame contents:")
print(df)

# Define variables
X = df.drop(columns=['protocol'])  # Features
non_numeric_cols = X.select_dtypes(exclude=['number']).columns
X[non_numeric_cols] = X[non_numeric_cols].fillna('Unknown') # Replace missing values with 'Unknown' for non-numeric columns
numeric_cols = X.select_dtypes(include=['number']).columns # Replace missing values with mean of each column for numeric columns
X[numeric_cols] = X[numeric_cols].fillna(X[numeric_cols].mean())
y = df['protocol']  # Target variable

# Balance classes using SMOTE
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# Split resampled dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# Train Random Forest classifier
print("Building Random Forest Model...")
model = RandomForestClassifier(n_estimators=2, max_depth=2, min_samples_split=2, min_samples_leaf=1, random_state=42)
model.fit(X_train, y_train)

# Evaluate model on the testing set
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Model Accuracy:", accuracy)

# Calculate and check classification report and confusion matrix
print("Classification Report:")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Apply model to classify incoming network traffic
def extract_features_from_incoming_packet(packet):
    packet_info = packet_callback(packet)
    return [packet_info[feature] for feature in ['source_ip', 'destination_ip', 'source_port', 'destination_port', 'packet_size', 'timestamp']]

# Select a row from df (change accordingly)
selected_row = df.iloc[3]

# Convert the selected row into a dictionary
incoming_packet = selected_row.to_dict()
print("Packet information:")
print(incoming_packet)

# For testing, ignore:
# incoming_packet = {
#     'source_ip': '192.168.1.1',
#     'destination_ip': '8.8.8.8',
#     'protocol': 'IPv6',
#     'packet_size': 90,
#     'timestamp': 1636015278.654321  # Timestamp in seconds since the epoch
# }

incoming_packet_features = extract_features_from_incoming_packet(incoming_packet)
predicted_label = model.predict([incoming_packet_features])

# Prediction
if predicted_label == "Anomalous":
    print("Anomalous behaviour detected. Take appropriate action.")
else:
    print("Normal behaviour detected.")

# Visualisation 1: Bar plot of protocol distribution
plt.figure(figsize=(8, 6))
sns.countplot(x='protocol', data=df)
plt.title('Protocol Distribution')
plt.xlabel('Protocol')
plt.ylabel('Count')
plt.show()

# Visualisation 2: Scatter plot of packet size vs. timestamp
plt.figure(figsize=(8, 6))
sns.scatterplot(x='timestamp', y='packet_size', data=df)
plt.title('Packet Size vs. Timestamp')
plt.xlabel('Timestamp')
plt.ylabel('Packet Size')
plt.show()

# Visualisation 3: Box plot of packet size by protocol
plt.figure(figsize=(8, 6))
sns.boxplot(x='protocol', y='packet_size', data=df)
plt.title('Packet Size by Protocol')
plt.xlabel('Protocol')
plt.ylabel('Packet Size')
plt.show()

# Visualisation 4: Correlation heatmap
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('Correlation Heatmap')
plt.show()