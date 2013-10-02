/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.dolidiaries.beta;

import android.os.Bundle;
import android.widget.Toast;

import org.apache.cordova.*;

public class DoliDiaries extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        try {
       // super.setStringProperty("loadingDialog", "Launching your Diary...");
        super.setIntegerProperty("splashscreen", R.drawable.splash);
       
        super.loadUrl(Config.getStartUrl(),1000);
        } catch(Error error){
        	Toast.makeText(getApplicationContext(), "Error"+error.getMessage(), 1).show();
        } catch (Exception ex){
        	Toast.makeText(getApplicationContext(), "Error"+ex.getMessage(), 1).show();
        }
      
        //super.loadUrl("file:///android_asset/www/index.html")
    }
}

