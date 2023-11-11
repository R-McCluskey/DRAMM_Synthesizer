package com.DRAMM.database.models;

import java.io.Serializable;



public class Sound implements Serializable {

    private String name;

    private int reverb;

    private int distortion;

    public Sound(String name, int reverb, int distortion) {
        this.name = name;
        this.reverb = reverb;
        this.distortion = distortion;
    }

    public int getReverb() {
        return reverb;
    }

    public void setReverb(int reverb) {
        this.reverb = reverb;
    }

    public int getDistortion() {
        return distortion;
    }

    public void setDistortion(int distortion) {
        this.distortion = distortion;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
