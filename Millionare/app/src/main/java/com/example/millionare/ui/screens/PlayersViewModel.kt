package com.example.millionare.ui.screens

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.millionare.model.DataPlayers
import com.example.millionare.network.PlayersApi
import kotlinx.coroutines.launch
import retrofit2.HttpException
import java.io.IOException

/**
 * UI state for the Home screen
 */
sealed interface PlayersUiState {
    data class Success(val players: List<DataPlayers>) : PlayersUiState // Use a list of DataPlayers
    object Error : PlayersUiState
    object Loading : PlayersUiState
}


class PlayersViewModel : ViewModel() {
    var playersUiState: PlayersUiState by mutableStateOf(PlayersUiState.Loading)
        private set

    init {
        getPlayersData()
    }

    fun getPlayersData() {
        viewModelScope.launch {
            playersUiState = PlayersUiState.Loading // Show loading screen

            try {
                // Get data from the API or local source
                val listResult = PlayersApi.retrofitService.getPlayers()
                playersUiState = PlayersUiState.Success(listResult)  // Update UI state with players
            } catch (e: Exception) {
                playersUiState = PlayersUiState.Error
            }
        }
    }
}


