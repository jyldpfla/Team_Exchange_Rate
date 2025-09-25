package com.mbccurrency.api.dto;

import java.time.LocalDate;

public class ExchangeRateDto {
    private LocalDate date;
    private Double usd;
    private Double jpy;
    private Double eur;
    private Double cny;

    public ExchangeRateDto(LocalDate date, Double usd, Double jpy, Double eur, Double cny) {
        this.date = date; this.usd = usd; this.jpy = jpy; this.eur = eur; this.cny = cny;
    }

    public LocalDate getDate() { return date; }
    public Double getUsd() { return usd; }
    public Double getJpy() { return jpy; }
    public Double getEur() { return eur; }
    public Double getCny() { return cny; }
}
