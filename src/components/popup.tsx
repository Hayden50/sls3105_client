import React, { FC, ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Popup: FC<PopupProps> = ({ isVisible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#300796",
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 6,
    borderColor: "#300796",
  },
  modalText:{
    color: "#FFF",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    marginBottom: -50,
    fontSize: 17
  },
});

