jQuery.curry=function(fn,args,context){var args=args||[],context=context||window;return function(){var data=args.concat(),k=-1,match=false,len=data.length;for(var i=0,ii=arguments.length;i<ii;i++){do{k++;match=(len>k&&data[k]===undefined);}while(data.length>k&&!match)
if(match){data[k]=arguments[i];}else{data.push(arguments[i]);}}
return fn.apply(context,data);}};(function($){function WidgetProfile(params){WidgetForm.apply(this,arguments);this.setup();}
WidgetProfile.prototype=$.extend(new WidgetForm(),{url:Site.domain+'/json/profile.json',validation:null,setup:function(){var validation=this.validation=new Form(),node=this.node,fn_not_empty=Validation.notEmpty,fn_phone_number=function($el){const value=$el.val();if(value==='12341234'){return true;}
const countryCode=$('#country').val();if(countryCode){const phoneUtil=window.libphonenumber.PhoneNumberUtil.getInstance();const number=phoneUtil.parseAndKeepRawInput(value,countryCode);return phoneUtil.isPossibleNumber(number)&&phoneUtil.isValidNumberForRegion(number,countryCode);}
return false;}
fn_check_postcode=function(){let length=$('#postcode').val().length,valid=length<=10&&length>0;fn_disable_submit(valid);return valid;},fn_get_pass=function(){return $('#password').val();},fn_match_pass=$.curry(Validation.isMatch,[undefined,fn_get_pass]),fn_check_age=function(){var year=Number($('#dob_yy').val());var month=Number($('#dob_mm').val())-1;var day=Number($('#dob_dd').val());var today=new Date();var age=today.getFullYear()-year;if(today.getMonth()<month||(today.getMonth()==month&&today.getDate()<day)){age--;}
return age>=18;},fn_tin_unavailable=function(){if($('#tin_unavailable_1').is(':checked')||$('#tin_unavailable_2').is(':checked')||$('#tin_unavailable_3').is(':checked')){return true;}
return false;},fn_check_document_number=function(){let val=$('#document_number').val();let valid=val.length<=25&&val.length>0;fn_disable_submit(valid);return valid;},fn_check_address1=function(){let val=$('#address1').val();let valid=val.length>0;fn_disable_submit(valid);return valid;},fn_check_town=function(){let val=$('#town').val();let valid=val.length>0;fn_disable_submit(valid);return valid;},check_first_local_name=function(){if(typeof(showLocalNames)=='undefined'||(typeof(showLocalNames)!=='undefined'&&!showLocalNames)){return true;}
return $('#first_name_local').val().length>0;},check_last_local_name=function(){if(typeof(showLocalNames)=='undefined'||(typeof(showLocalNames)!=='undefined'&&!showLocalNames)){return true;}
return $('#last_name_local').val().length>0;},check_dob=function(){let val=$('#dob').val(),valid=true,age=0;if(val.length<=0){valid=false;}else{let date=val.split('-'),year=Number(date[0]),month=Number(date[1]),day=Number(date[2]),today=new Date();age=today.getFullYear()-year;let todayMonth=today.getMonth()+1;if(todayMonth<month||((todayMonth==month)&&(today.getDate()<day))){age--;}}
let isValid=valid&&age>=18&&age<120;if(isValid){$('#dob').parent().find('.calendar').removeClass('is-invalid');}else{$('#dob').parent().find('.calendar').addClass('is-invalid');}
fn_disable_submit(isValid);return isValid;},fn_expiry_date=function(){let val=$('#expiry_date').val(),date=val.split('-'),year=date[0],month=date[1],day=date[2],startTime=new Date(year+'-'+month+'-'+day),endTime=new Date();let valid=(startTime>endTime&&year>=2022)||(val.length<=0);if(valid){$('#expiry_date').parent().find('.calendar').removeClass('is-invalid');}else{$('#expiry_date').parent().find('.calendar').addClass('is-invalid');}
fn_disable_submit(valid);return valid;},fn_disable_submit=function(valid=true){if(typeof(filesIsValid)=='undefined'){return;}
if(valid&&filesIsValid&&!$('.address-data .form-control, .identity-data .form-control').hasClass('is-invalid')){$('#submit_btn').removeClass('disabled').removeAttr('disabled');}
if(!valid&&!$('#submit_btn').hasClass('disabled')){$('#submit_btn').addClass('disabled').attr('disabled',true);}};validation.add($('#first_name'),{'validate':Validation.notEmpty}).add($('#last_name'),{'validate':Validation.notEmpty}).add($('#email'),{'validate':Validation.isEmail}).add($('#nationality'),{'validate':fn_not_empty}).add($('#gender'),{'validate':fn_not_empty}).add($('#dob_dd'),{'validate':fn_check_age}).add($('#dob_mm'),{'validate':fn_check_age}).add($('#dob_yy'),{'validate':fn_check_age}).add($('#postcode'),{'validate':fn_check_postcode}).add($('#country'),{'validate':fn_not_empty}).add($('#phone_landline_prefix'),{}).add($('#phone_landline'),{}).add($('#phone_mobile_prefix'),{}).add($('#phone_mobile'),{}).add($('#phone_mobile.lib_validate'),{'validate':fn_phone_number}).add($('#employment_status'),{'validate':fn_not_empty}).add($('#business_nature'),{'validate':fn_not_empty}).add($('#funds_source'),{'validate':fn_not_empty}).add($('#expected_deposit_id'),{'validate':fn_not_empty}).add($('#other_business_type'),{'validate':fn_not_empty}).add($('#other_source_of_funds'),{'validate':fn_not_empty}).add($('#annual_income'),{'validate':fn_not_empty}).add($('#net_worth'),{'validate':fn_not_empty}).add($('#expected_deposit'),{'validate':fn_not_empty}).add($('#first_name_local'),{'validate':check_first_local_name}).add($('#last_name_local'),{'validate':check_last_local_name}).add($('#document_number'),{'validate':fn_check_document_number}).add($('#dob'),{'validate':check_dob}).add($('#expiry_date'),{'validate':fn_expiry_date});$('#country.lib_validate').change(()=>{validation.validate('phone_mobile')})
if(typeof(specialAddress)==='undefined'||!specialAddress){validation.add($('#address1'),{}).add($('#address2'),{}).add($('#town'),{})}else{validation.add($('#address1'),{'validate':fn_check_address1}).add($('#address2'),{}).add($('#town'),{'validate':fn_check_town});}
if($('#tin').val()==""&&$('#tin_unavailable_3:checked').length==1){validation.add($('#tin_reason'),{'validate':fn_not_empty})}
validation.add($('#traded_forex_frequency'),{'validate':fn_not_empty}).add($('#traded_forex_volume'),{'validate':fn_not_empty}).add($('#traded_bonds_frequency'),{'validate':fn_not_empty}).add($('#traded_bonds_volume'),{'validate':fn_not_empty}).add($('#traded_products_frequency'),{'validate':fn_not_empty}).add($('#traded_products_volume'),{'validate':fn_not_empty}).add($('#seminar_course_experience'),{'validate':fn_not_empty}).add($('#work_qualification_experience'),{'validate':fn_not_empty}).add($('#seminar_experience_yes'),{'validate':fn_not_empty}).add($('#work_experience_yes'),{'validate':fn_not_empty});this.chain('country',function(val_country){var prefix='';if(CountryToPrefix&&val_country in CountryToPrefix){prefix='+'+CountryToPrefix[val_country];}
$('#phone_landline_prefix, #phone_mobile_prefix').val(prefix);});this.chain('employment_status',function(val_status){if(val_status==1||val_status==3){$('#business_nature').closest('.form-group').show();$('#business_nature').removeAttr('disabled');}else{$('#business_nature').closest('.form-group').hide();$('#business_nature').attr('disabled','disabled');}});this.chain(['business_nature'],function(val_business){var BUSINESS_TYPE_OTHER_ID=$('#business_nature option.other').attr('value');if(val_business==BUSINESS_TYPE_OTHER_ID){$('#other_business_type').closest('.form-group').show();$('#other_business_type').removeAttr('disabled');}else{$('#other_business_type').closest('.form-group').hide();$('#other_business_type').attr('disabled','disabled');}});this.chain(['funds_source'],function(val_source){var SOURCE_OF_FUNDS_OTHER_ID=$('#funds_source option.other').attr('value');if(val_source==SOURCE_OF_FUNDS_OTHER_ID){$('#other_source_of_funds').closest('.form-group').show();$('#other_source_of_funds').removeAttr('disabled');}else{$('#other_source_of_funds').closest('.form-group').hide();$('#other_source_of_funds').attr('disabled','disabled');}});this.chain(['seminar_experience_yes'],function(value){if(this.attr('checked')){return{'show':['seminar_course_experience']};}});this.chain(['seminar_experience_no'],function(val_no){if(this.attr('checked')){return{'hide':['seminar_course_experience']};}});this.chain(['work_experience_yes'],function(val_yes){if(this.attr('checked')){return{'show':['work_qualification_experience']};}});this.chain(['work_experience_no'],function(val_no){if(this.attr('checked')){return{'hide':['work_qualification_experience']};}});this.chain(['traded_forex_frequency'],function(){var val_forex=$('#traded_forex_frequency').val();if(val_forex==14||val_forex==''){return{'hide':['traded_forex_volume']};}else{return{'show':['traded_forex_volume']};}});this.chain(['traded_bonds_frequency'],function(){var val_bonds=$('#traded_bonds_frequency').val();if(val_bonds==14||val_bonds==''){return{'hide':['traded_bonds_volume']};}else{return{'show':['traded_bonds_volume']};}});this.chain(['traded_products_frequency'],function(){val_products=$('#traded_products_frequency').val();if(val_products==14||val_products==''){return{'hide':['traded_products_volume']};}else{return{'show':['traded_products_volume']};}});function fn_check_unavailable(){if($('#tin').val()!=""){$('#tin-unavailable-section').hide();}else{$('#tin-unavailable-section').show();if($('#tin_unavailable_3').is(':checked')){$('.reason-section').show();}else{$('.reason-section').hide();}}}
fn_check_unavailable();$('#tin').keyup(function(){fn_check_unavailable();});if($('[name=tin_unavailable]:checked').length==0&&$('#tin').val()==''){$('#tin').prop('required',true);}
$('[name=tin_unavailable]').click(function(){$('#tin').removeAttr('required');if($('#tin_unavailable_3').is(':checked')){$('.reason-section').show();$('#tin_reason').prop('required',true);}else{$('#tin_reason').removeAttr('required');$('.reason-section').hide();}});$('#country').on('change',function(){showLocalNames=typeof(corWithLocal)&&jQuery.inArray(this.value,corWithLocal)!=-1;if(showLocalNames){$('.local-names').show();}else{$('.local-names').hide();}});this.initChain();this.setupFieldHighlighting(validation);},validate:function(values){return this.validation.validate();},error:function(){return true;},success:function(){return true;}});this.RegistrationForm=new WidgetProfile({'html':$('#widgetProfileForm')});$('#first_name, #last_name').keyup(function(){$(this).val($(this).val().replace(new RegExp("[^a-zA-Z ]","g"),""));});$('#first_name_local, #last_name_local').keyup(function(){$(this).val($(this).val().replace(new RegExp(/[^\p{L} \-'`]+/ug),''));});if(typeof(specialAddress)!=='undefined'&&specialAddress){$('#address1, #address2, #postcode, #town').keyup(function(){$(this).val($(this).val().replace(new RegExp(/[^\p{L}0-9. #,-]+/ug),''));});}else{$('#address1, #address2, #postcode').keyup(function(){$(this).val($(this).val().replace(new RegExp("[^a-zA-Z0-9\#\-\/ ]",'g'),''));});$(' #town').keyup(function(){$(this).val($(this).val().replace(new RegExp("[^a-zA-Z ]","g"),''));});}
if(typeof(kycStatus)==='undefined'){return;}
if(kycStatus==='POI'||kycStatus==='done'){$('#widgetProfileForm .poi').find('input, textarea, select').attr('disabled','disabled');}
if(kycStatus==='done'){$('#widgetProfileForm .por').find('input, textarea, select').attr('disabled','disabled');var prefix='';var val_country=$('#country').val();if(CountryToPrefix&&val_country in CountryToPrefix){prefix='+'+CountryToPrefix[val_country];$('#phone_landline_prefix, #phone_mobile_prefix').val(prefix);}}
if(kycStatus!==false){$('[name=email]').removeAttr('disabled');$('[name=security]').removeAttr('disabled');$('[name=action]').removeAttr('disabled');}})(jQuery);