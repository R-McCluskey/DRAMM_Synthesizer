package com.DRAMM.database.models;

import java.io.Serializable;



public class Sound implements Serializable {

    private String name;

    private double reverb;

    private double distortion;

    public Sound(String name, double reverb, double distortion) {
        this.name = name;
        this.reverb = reverb;
        this.distortion = distortion;
    }

    public double getReverb() {
        return reverb;
    }

    public void setReverb(double reverb) {
        this.reverb = reverb;
    }

    public double getDistortion() {
        return distortion;
    }

    public void setDistortion(double distortion) {
        this.distortion = distortion;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
