import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(projectsResponse => {
            setProjects(projectsResponse.data.payload)
        }).catch(rejection => {
            console.log(rejection)
        })
    }, []);

    async function handleAddProject() {
        const postResponse = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Esdras Motta',
        });

        const project = postResponse.data.payload;
        setProjects([...projects, project])
    };

    return (
        <>
            <StatusBar barStyle='light-content' />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item }) => (
                        <Text style={styles.project}>{item.title}</Text>
                    )}
                />
                <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProject}>
                    <Text style={styles.buttonText}> Adicionar Projeto </Text>
                </TouchableOpacity >
            </SafeAreaView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: "#FFF",
        fontSize: 30,
    },
    button: {
        backgroundColor: '#FFF',
        margin: 25,
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
})