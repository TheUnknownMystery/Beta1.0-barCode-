import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView} from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Touchable } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class TransactionScreen extends React.Component {

  constructor() {
    super()

    this.state = {

      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
      scannedBookID: '',
      scannedStudentID: '',
      transactionMessage: ''
    }
  }

  BookIssue=async()=>{
    //add a transaction
  db.collection("Transactions").add({

    'studentId': this.state.scannedStudentID,
    'bookId': this.state.scannedBookID,
    'date': firebase.firestore.Timestamp.now().toDate(),
    'TransactionType': "Issue"

  })

  //change book status
  db.collection("Books").doc(this.state.scannedBookID).update({
    'BookAvailability': false
  })

  //change number of books issued to student
  
  db.collection("Students").doc(this.state.scannedStudentID).update({

     'NoOfBooksIssued': firebase.firestore.FieldValue.increment(1)


  })

  //alert('BookIssued')
  this.setState({

  scannedBookID: '',
  scannedStudentID: ''

  })



  }

  

  //function bookreturn

  bookReturn=async()=>{
    //add a transaction
  db.collection("Transactions").add({

    'studentId': this.state.scannedStudentID,
    'bookId': this.state.scannedBookID,
    'date': firebase.firestore.Timestamp.now().toDate(),
    'TransactionType': "Return"

  })

  //change book status
  db.collection("Books").doc(this.state.scannedBookID).update({
    'BookAvailability': true
  })

  //change number of books issued to student
  
  db.collection("Students").doc(this.state.scannedStudentID).update({

     'NoOfBooksIssued': firebase.firestore.FieldValue.increment(-1)


  })

  //alert('BookIssued')
  this.setState({

  scannedBookID: '',
  scannedStudentID: ''

  })



  }
  
  
  getCameraPermission = async (ID) => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //object->key-value pairs-one of the key is vcamera
    //status===granted

    this.setState({
      //status==="granted" is TRUE when user grants the permission
      //status==="granted" is FALSE when user denies the permission
      hasCameraPermissions: status === "granted",
      buttonState: ID,
      scanned: false
    })

  }

  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state;

    if (buttonState === "bookID") {

      this.setState({
        scannedBookID: data,
        scanned: true,
        buttonState: 'normal'
      })

    }

    else if (buttonState === "studentID") {

      this.setState({
        scannedStudentID: data,
        scanned: true,
        buttonState: 'normal'
      })
    }
  }

  handleTransaction = async () => {
    var transactionMessage;
    db.collection("Books").doc(this.state.scannedBookID).get()
      .then((doc) => {

        var Book = doc.data()

        if (Book.BookAvailability) {

          this.BookIssue();
          transactionMessage = " Book Issued";

        } else {

          this.bookReturn();
          transactionMessage = "Book Returned";

        }

        this.setState({

        transactionMessage: transactionMessage


        })

      })


  }
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== 'normal' && hasCameraPermissions === true) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )
    }



    else if (buttonState === 'normal') {

      return (
        <KeyboardAvoidingView style={styles.viewStyle} behavior="padding" enabled>
          <View>

            <Image
              style={{ width: 200, height: 200 }}
              source={require('../assets/booklogo.jpg')}

            />

            <Text style={{ textAlign: 'center', fontSize: 30 }}>
              WILY
          </Text>

          </View>

          <View style={styles.InputView}>

            <TextInput
              style={styles.inputBox}
              placeholder='BookID'
              onChangeText={text=>this.setState({scannedBookID:text})}
              value={this.state.scannedBookID}
            />

            <TouchableOpacity style={styles.ScanButton} onPress={() => {

              this.getCameraPermission('bookID')

            }}>

              <Text style={styles.buttonText}>Scan</Text>

            </TouchableOpacity>
          </View>

          <View style={styles.InputView}>

            <TextInput
              style={styles.inputBox}
              placeholder='StudentID'
              onChangeText={text=>this.setState({scannedStudentID:text})}
              value={this.state.scannedStudentID}
            />

            <TouchableOpacity style={styles.ScanButton} onPress={() => {

              this.getCameraPermission("studentID")


            }}>

              <Text style={styles.buttonText}>Scan</Text>

            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.submitButton} onPress={this.handleTransaction}>

            <Text style={styles.submitButtonText}>Submit</Text>

          </TouchableOpacity>


        </KeyboardAvoidingView>

      )
    }
  }
}

const styles = StyleSheet.create({

  viewStyle: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },

  ScanButton: {

    backgroundColor: 'grey',
    padding: 10,

  },

  displayText: {

    fontSize: 15,
    textDecorationLine: 'underline'

  },

  InputView: {

    flexDirection: 'row',
    margin: 20,
    height: 40
  },

  inputBox: {

    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20

  },

  buttonText: {

    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,


  },

  submitButton: {

    backgroundColor: 'grey',
    width: 100,
    height: 50

  },

  submitButtonText: {

    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
})
