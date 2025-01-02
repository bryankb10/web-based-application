package com.example.millionare.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.millionare.R
import com.example.millionare.model.DataPlayers
import com.example.millionare.ui.theme.MillionareTheme

@Composable
fun HomeScreen(
    playersUiState: PlayersUiState,
    modifier: Modifier = Modifier,
    contentPadding: PaddingValues = PaddingValues(0.dp),
) {
    when (playersUiState) {
        is PlayersUiState.Loading -> LoadingScreen(modifier = modifier.fillMaxSize())
        is PlayersUiState.Success -> ResultScreen(players = playersUiState.players, modifier = modifier.fillMaxWidth())
        is PlayersUiState.Error -> ErrorScreen(modifier = modifier.fillMaxSize())
    }
}

/**
 * The home screen displaying the loading message.
 */
@Composable
fun LoadingScreen(modifier: Modifier = Modifier) {
    Image(
        modifier = modifier.size(200.dp).padding(16.dp),
        painter = painterResource(R.drawable.loading_img),
        contentDescription = stringResource(R.string.loading)
    )
}

/**
 * The home screen displaying error message with re-attempt button.
 */
@Composable
fun ErrorScreen(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier.padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = painterResource(id = R.drawable.ic_connection_error), contentDescription = ""
        )
        Text(text = stringResource(R.string.loading_failed), modifier = Modifier.padding(top = 16.dp))
    }
}

/**
 * ResultScreen displaying number of players retrieved.
 */
@Composable
fun ResultScreen(players: List<DataPlayers>, modifier: Modifier = Modifier) {
    var pageIndex by remember { mutableStateOf(1) }
    val itemsPerPage = 5
    val currentPagePlayers = players.drop((pageIndex - 1) * itemsPerPage).take(itemsPerPage)

    Box(
        contentAlignment = Alignment.TopCenter,
        modifier = modifier.fillMaxSize().padding(top = 100.dp)
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            // Player List
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp)
            ) {
                items(currentPagePlayers) { player ->
                    PlayerCard(player)
                }
            }

            // Pagination Controls
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 24.dp, start = 16.dp, end = 16.dp)
            ) {
                Button(
                    onClick = { pageIndex-- },
                    enabled = pageIndex > 1,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.primary,
                        contentColor = MaterialTheme.colorScheme.onPrimary,
                        disabledContainerColor = MaterialTheme.colorScheme.secondary,
                        disabledContentColor = MaterialTheme.colorScheme.onPrimary
                    )
                ) {
                    Text("Previous")
                }

                Button(
                    onClick = { pageIndex++ },
                    enabled = players.size > pageIndex * itemsPerPage,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.primary,
                        contentColor = MaterialTheme.colorScheme.onPrimary,
                        disabledContainerColor = MaterialTheme.colorScheme.secondary,
                        disabledContentColor = MaterialTheme.colorScheme.onPrimary
                    )
                ) {
                    Text("Next")
                }

            }
        }
    }
}

@Composable
fun PlayerCard(player: DataPlayers) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
    ) {
        Row(
            modifier = Modifier
                .background(Color(0xFF151B54))
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,

        ) {
            Text(
                text = "${player.rank}",
                fontSize = 50.sp,
                modifier = Modifier
                    .padding(end = 16.dp),
                color = Color(0xFFffd700)
            )
            var pad = 75.dp;
            if (player.rank >= 10) {
                pad = 50.dp;
            }
            Column (
                modifier = Modifier
                    .padding(start = pad)
                    .fillMaxWidth()

            ) {
                Text(
                    text = player.name,
                    fontSize = 30.sp,
                    color = Color(0xFFffd700)
                )
                Text(
                    text = "Score: ${player.score}",
                    fontSize = 20.sp,
                    color = Color(0xFFffd700)
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun LoadingScreenPreview() {
    MillionareTheme {
        LoadingScreen()
    }
}

@Preview(showBackground = true)
@Composable
fun ErrorScreenPreview() {
    MillionareTheme {
        ErrorScreen()
    }
}

@Preview(showBackground = true)
@Composable
fun PlayersGridScreenPreview() {
    MillionareTheme {
    }
}
