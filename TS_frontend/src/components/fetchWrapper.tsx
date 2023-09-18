export class FetchWrapper {
  private adress: string;
  private body: string = "";

  constructor(adress: string) {
    this.adress = adress;
  }

  public setBody(body: string | object) {
    if (typeof body !== "string") {
      this.body = JSON.stringify(body);
    }
    return body;
  }

  getRequest(): Promise<Response | undefined> {
    const requestOptions = {
      method: "GET",
    };

    return this.sendRequest(requestOptions);
  }

  deleteRequest(): Promise<Response | undefined> {
    const requestOptions: RequestInit = {
      method: "DELETE",
    };

    return this.sendRequest(requestOptions);
  }

  putRequest(): Promise<Response | undefined> {
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: this.body,
    };

    return this.sendRequest(requestOptions);
  }

  postRequest(): Promise<Response | undefined> {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: this.body,
    };

    return this.sendRequest(requestOptions);
  }

  private async sendRequest(
    requestOptions: RequestInit
  ): Promise<Response | undefined> {
    try {
      const response = await fetch(this.adress, requestOptions);
      console.log(response);
      if (response.ok) {
        console.log("Request was successful!");
        return response;
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
  }
}
