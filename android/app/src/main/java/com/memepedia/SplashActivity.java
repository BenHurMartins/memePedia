package com.memepedia;

import android.content.Intent;
import android.os.Bundle;

// import android.support.v7.app.AppCompatActivity; //  ← For RN >= 0.60
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}