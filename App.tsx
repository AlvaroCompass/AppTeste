import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface item {
  title: string;
  quantity: number;
}

function App(): React.JSX.Element {
  const [number, setNumber] = useState(1);
  const [title, setTitle] = useState('');
  const [itens, setItens] = useState<item[]>([]);

  function plus() {
    setNumber(prevState => prevState + 1);
  }

  function minus() {
    number !== 1 && setNumber(prevState => prevState - 1);
  }

  function handleAddItem() {
    if (title) {
      setItens(prevState => [...prevState, {title: title, quantity: number}]);
    }
  }

  function removeItem(id: string) {
    setItens(itens.filter(item => item.title !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de compras</Text>

      <Pressable onPress={() => setItens([])}>
        <Text>Limpar</Text>
      </Pressable>
      {itens.length !== 0 && (
        <FlatList
          style={styles.list}
          data={itens}
          renderItem={({item, index}) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.text}>
                {item.title} - {item.quantity}
              </Text>

              <Pressable onPress={() => removeItem(item.title)}>
                <Text>Remover</Text>
              </Pressable>
            </View>
          )}
        />
      )}

      <View>
        <View style={styles.inptContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Digite o nome do item"
            placeholderTextColor={'#000'}
          />

          <View style={styles.countContainer}>
            <Pressable onPress={plus}>
              <Text style={styles.plus}>+</Text>
            </Pressable>
            <Text style={styles.number}>{number}</Text>
            <Pressable onPress={minus}>
              <Text style={styles.minus}>-</Text>
            </Pressable>
          </View>
        </View>

        <Pressable onPress={handleAddItem} style={styles.btn}>
          <Text style={styles.btnText}>Adicionar item a lista</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 2,
  },

  list: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    maxHeight: '80%',
    marginBottom: 2,
  },

  listItem: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  text: {
    color: '#000',
    fontSize: 18,
  },

  inptContainer: {
    flexDirection: 'row',
    borderRadius: 4,
  },

  input: {
    width: '80%',
    paddingHorizontal: 2,
  },

  countContainer: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  minus: {
    fontSize: 40,
    color: 'red',
  },

  plus: {
    fontSize: 20,
    color: 'red',
  },

  number: {
    fontSize: 20,
    color: '#000',
  },

  btn: {
    marginTop: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#50B63F',
    borderRadius: 4,
  },

  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;
