import React from "react"
import { Text, StyleSheet } from "react-native"

export default function Header({ children }) {
    return (
        <Text style={styles.text}>{children}</Text>
    )
}
const styles = StyleSheet.create({
text: {
    paddingTop: 12,
    fontSize: 18,
    lineHeight: 12,
    fontWeight: "normal"
}
})