package com.example.millionare.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class DataPlayers(
    val name: String,
    val score: String,
    val rank: Int // Change rank to Int
)


