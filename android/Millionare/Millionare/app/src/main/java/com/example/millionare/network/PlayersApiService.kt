package com.example.millionare.network

import com.example.millionare.model.DataPlayers
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import retrofit2.Retrofit
import retrofit2.http.GET

private const val BASE_URL = "http://192.168.0.19:3000"

private val retrofit = Retrofit.Builder()
    .baseUrl(BASE_URL)
    .addConverterFactory(Json.asConverterFactory("application/json".toMediaType()))
    .build()

interface PlayersApiService {
    @GET("scores")
    suspend fun getPlayers(): List<DataPlayers>
}

object PlayersApi {
    val retrofitService: PlayersApiService by lazy {
        retrofit.create(PlayersApiService::class.java)
    }
}
