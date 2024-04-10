import { Link, useLocalSearchParams } from "expo-router";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList, Dimensions, useWindowDimensions, SafeAreaView, ScrollView} from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import React, {useEffect} from "react";

const Search = ({ navigation, route }) => {
    const windowDimensions = Dimensions.get('window')
    const { id } = useLocalSearchParams();
    const { userData } = route.params;
    const dummyData = [
        'John Doe', 'Michael Phelps', 'Harry Potter', 'Lelouch Britannia', 'Tony Stark'
    ];
    const handleNamePress = async (item) => {
        let id; //Temporary variable to send to next page

        //Loops and compares objects queried to find user id
        let i = 0;
        while (i < clientList.length) {
            if (clientList[i] == item) {
                id = clientList[i].UserID;
                console.log(id); //Test to confirm correct ID
                break;
            }
            i++;
        }
    };
    const [nameInput, newNameInput] = React.useState('');
    const [clientList, setClientList] = React.useState([]);
    const [firstLetterArr, setFirstLetterArr] = React.useState([]);
    const [clientList2, setClientList2] = React.useState([[]]);

    const handleNameSearch = () => {

        const filteredClients = clientList2.map(clientArray =>
            clientArray.filter(clientName => clientName.toLowerCase().includes(nameInput.toLowerCase()))
        );
        setClientList2(filteredClients);
    };

    useEffect(() => {
        displayClientList('firstNameAscending');
    }, []);

    //for the drop down list below
    const [selected, setSelected] = React.useState(" ");

    const dropdownList = [
        { key: 'Ascending', value: 'Ascending' },
        { key: 'Descending', value: 'Descending' },
    ]

    async function displayClientList(selectedOption) {
        let clientNames: string[] = [];
        let tempFirstLetterArr: string[] = [];
        let tempNameArr: string[][] = [];

        let clientData = dummyData;
        let client1;

        console.log(selectedOption);
        //sorts clientData based on the dropdown menu. Ascending(A-Z) is the default option.
        if (selectedOption == 'Ascending')
            clientData.sort((a, b) => a.localeCompare(b));
        else if (selectedOption == 'Descending')
            clientData.sort((a, b) => a.localeCompare(b)).reverse(); // reverse flips the array to Z-A

        //this loop makes the array of all the first letters in first names to be used to sort the list later.
        for (client1 in clientData) {
            let firstLetter = clientData[client1][0];
            if (tempFirstLetterArr.find(o => o === firstLetter) == null) {
                tempFirstLetterArr.push(firstLetter);
            }
        }

        //loop that makes a string array with only the names of the clients and nothing else.
        let iterable;
        for (iterable in clientData) {
            let name = clientData[iterable];
            clientNames.push(name);
        }

        //set two variables to use in the loop down below
        let temp: string[] = [];
        let currentLetter = '';
        //this loop splits clientData up into multiple seperate arrays that have first names all beginning with the same letter.
        for (let client of clientNames) {
            //a first letter var that holds the first letter of the clients first name
            const firstLetter = client.charAt(0);

            //if first letter != current letter then check to see if temp has anything in it. if it does then push whatever is in temp
            //to the temp array of arrays then set the current letter to the first letter and temp to the name of client to use
            //in the next loop
            if (firstLetter != currentLetter) {
                if (temp.length > 0) {
                    tempNameArr.push(temp);
                }
                currentLetter = firstLetter;
                temp = [client];
            }
            //else if they are equal just push the clients name to temp.
            else if (firstLetter == currentLetter) {
                temp.push(client)
            }
        }

        //after loop finishes if temp has anything in it make sure to push whatever is in it to the temp array of arrays
        if (temp.length > 0) {
            tempNameArr.push(temp);
        }

        //setting all the lists that are needed for displaying
        setClientList2(tempNameArr);
        setFirstLetterArr(tempFirstLetterArr);
        setClientList(clientData);

    }

    return (
        <View style={styles.container}>
            <View style={[styles.searchBarContainer]}>
                <TextInput
                    style={styles.textField}
                    value={nameInput}
                    onChangeText={newNameInput}
                    onTextInput={() => handleNameSearch()}
                    placeholder="Search"
                />
            </View>
            <View style={styles.dropdowncont}>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={dropdownList}
                    boxStyles={{ backgroundColor: 'white' }}
                    dropdownStyles={{ backgroundColor: 'white' }}
                    save='value'
                    search={false}
                    defaultOption={{ key: 'Ascending', value: 'Ascending' }}
                    onSelect={() => displayClientList(selected)} //rebuild the list in ascending/descending order
                />
            </View>
            <View>
                <FlatList
                    data={firstLetterArr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View>
                            <View style={styles.availableLetterContainer}>
                                <Text style={styles.availableLetterText}>{item}</Text>
                            </View>
                            <View style={styles.availableNameContainer}>
                                <FlatList
                                    data={clientList2[index]}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={[styles.nameContainer]}>
                                            <TouchableOpacity
                                                style={styles.nameButton}
                                                onPress={() => handleNamePress(item)}
                                            >
                                                <Text style={styles.nameText}>{item}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    )}
                    style={styles.letterFlatListStyle}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        rowGap: 10,
        paddingVertical: 30,
        backgroundColor: "#bfefff",
    },

    // search bar
    searchBarContainer: {
        alignItems: 'center'
    },
    textField: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontWeight: 'bold',
        width: '90%',
        height: 50,
        borderRadius: 15,
        padding: 10,
        fontSize: 20
    },

    // names
    nameContainer: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
        rowGap: 10,
    },
    nameButton: {
        padding: 10,
    },
    nameText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    nameLine: {
        borderTopColor: 'black',
        borderTopWidth: 1
    },
    availableLetterContainer: {
        paddingLeft: 12,
    },
    availableLetterText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    availableNameContainer: {
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    letterFlatListStyle: {
        height: '78%'
    },
    dropdowncont: {
        padding: 16
    },
});

export default Search;