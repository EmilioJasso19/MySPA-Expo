import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Pressable,
    Alert,
    AppState
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {supabase} from "../lib/supabase";

const Register = () => {
    const [name, setName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)

    AppState.addEventListener('change', (state) => {
        if (state === 'active') {
            supabase.auth.startAutoRefresh()
        } else {
            supabase.auth.stopAutoRefresh()
        }
    })


    async function handleRegister() {
        setLoading(true)
        const {
            data: {session},
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message, 'Todos los campos deben ser rellenados completamente')
        if (!session) Alert.alert('Checa tu correo!')
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Icon name="arrow-left" style={styles.backButton}/>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>MySPA</Text>
                <Text style={styles.subtitle}>Crea tu cuenta</Text>
            </View>

            {/* Input de Nombre */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Inputs de Fecha de Nacimiento */}
            <View style={styles.dateLabel}>
                <Text style={styles.label}>Fecha de nacimiento</Text>
                <View style={styles.dateContainer}>
                    <TextInput
                        style={[styles.input, styles.dateInput]}
                        placeholder="Día"
                        value={birthDay}
                        onChangeText={setBirthDay}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, styles.dateInput]}
                        placeholder="Mes"
                        value={birthMonth}
                        onChangeText={setBirthMonth}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, styles.dateInput]}
                        placeholder="Año"
                        value={birthYear}
                        onChangeText={setBirthYear}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            {/* Input de Correo Electrónico */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {/* Input de Teléfono */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Input de Contraseña */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {/* Input de Confirmar Contraseña */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            </View>

            <Pressable style={styles.loginTextContainer}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => handleRegister()}>
                <Text style={styles.buttonText}>Registrar</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    backButton: {
        position: 'absolute',
        top: 25,
        left: 10,
        color: '#252525',
        fontWeight: "100",
        fontSize: 20
    },
    header: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        color: '"252525',
        height: 50,
        marginTop: 25,
        marginBottom: 60
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    inputContainer: {
        marginBottom: 20,
        height: 80
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    label: {
        color: '#252525',
        fontSize: 14,
        marginBottom: 5,
    },
    dateLabel: {
        flexDirection: 'column',
        height: 80
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        height: 50
    },
    dateInput: {
        flex: 1,
        marginHorizontal: 5
    },
    button: {
        backgroundColor: '#ff9999',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        textAlign: "center",
        textAlignVertical: "center",
        marginHorizontal: 'auto',
        height: 60,
        width: 300
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loginTextContainer: {
        height: 50
    },
    loginText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});

export default Register;
